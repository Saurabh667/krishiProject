
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status
from .serializers import PhotoSerializer
from .models import Photo
from openai import OpenAI
from django.conf import settings
import base64
from azure.ai.inference import ChatCompletionsClient
from azure.ai.inference.models import SystemMessage, UserMessage
from azure.core.credentials import AzureKeyCredential
import random
import os
from django.conf import settings
from dotenv import load_dotenv
load_dotenv()

# ✅ Use your real API key from settings or env
# tokens = [""]
tokens = [
    # os.environ.get("GITHUB_TOKEN_1"),
    os.environ.get("GITHUB_TOKEN_2"),
]
token = random.choice([t for t in tokens if t])
# tokens = [t for t in tokens if t]
if not tokens:
    raise ValueError("No OpenAI API keys found")

token = random.choice(tokens)

endpoint = "https://models.github.ai/inference"
model = "openai/gpt-4.1-mini"
client = OpenAI(
    base_url=endpoint,
    api_key=token
    # endpoint=endpoint,
    # credential=AzureKeyCredential(token),
)

def get_image_data_url(image_field):
    """Converts uploaded image to a base64 data URL for OpenAI API."""
    file_path = image_field.path
    with open(file_path, "rb") as f:
        encoded = base64.b64encode(f.read()).decode("utf-8")
    mime_type = "image/png" if file_path.endswith(".png") else "image/jpeg"
    return f"data:{mime_type};base64,{encoded}"


class PhotoUploadView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, format=None):
        print("FILES:", request.FILES)
        print("DATA:", request.data)
        serializer = PhotoSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            photo = serializer.save()
            image_data_url = get_image_data_url(photo.image)

            try:
                response = client.chat.completions.create(
                    model=model,  
                    messages=[
                        {
                            "role": "system",
                            "content": (
                                "You are an agricultural expert who give recommendation in hinglish language. "
                                "Firstly identify the plant name with its Leaf."
                                "Analyze plant leaf images and detect possible diseases. "
                                "Return the name of the disease (if any), its severity, and recommended treatment . "
                                "If the leaf is healthy, say 'Healthy leaf'."
                            ),
                        },
                        {
                            "role": "user",
                            "content": [
                                {"type": "text", "text": "Analyze this leaf image and give disease detection result."},
                                {"type": "image_url", "image_url": {"url": image_data_url, "detail": "high"}},
                            ],
                        },
                    ],
                    # temperature=0,
                    temperature=1.0,
                    top_p=1.0,
                )

                diagnosis = str(response.choices[0].message.content).strip()
            except Exception as e:
                return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            image_url = request.build_absolute_uri(photo.image.url)

            return Response(
                {
                    "id": photo.id,
                    "image_url": image_url,
                    "diagnosis": diagnosis,
                },
                status=status.HTTP_201_CREATED,
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
