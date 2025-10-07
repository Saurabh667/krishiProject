

# from rest_framework.views import APIView
# from rest_framework.parsers import MultiPartParser, FormParser
# from rest_framework.response import Response
# from rest_framework import status
# from .serializers import PhotoSerializer
# from .models import Photo
# from openai import OpenAI
# import random
# from django.conf import settings
# import base64

# endpoint = "https://models.github.ai/inference"
# model_name = "openai/gpt-4o-mini"

# token = [t for t in token if t]
# client = OpenAI(
#     base_url=endpoint,
#     api_key=token,
# )

# def get_image_data_url(image_field):
#     """
#     Converts uploaded image to a base64 data URL for OpenAI API.
#     """
#     file_path = image_field.path
#     with open(file_path, "rb") as f:
#         encoded = base64.b64encode(f.read()).decode("utf-8")
#     mime_type = "image/png" if file_path.endswith(".png") else "image/jpeg"
#     return f"data:{mime_type};base64,{encoded}"

# class PhotoUploadView(APIView):
#     parser_classes = (MultiPartParser, FormParser)

#     def post(self, request, format=None):
#         serializer = PhotoSerializer(data=request.data, context={'request': request})
#         if serializer.is_valid():
#             photo = serializer.save()
#             image_data_url = get_image_data_url(photo.image)
#             try:
#                 response = client.chat.completions.create(
#                     model="gpt-4.1-mini",  # ✅ vision-capable model
#                     messages=[
#                         {
#                             "role": "system",
#                             "content": (
#                                 "You are an agricultural expert. "
#                                 "Your job is to analyze plant leaf images and detect possible diseases. "
#                                 "Return the name of the disease (if any), its severity, and recommended treatment. "
#                                 "If the leaf is healthy, say 'Healthy leaf'."
#                             ),
#                         },
#                         {
#                             "role": "user",
#                             "content": [
#                                 {"type": "text", "text": "Analyze this leaf image and give disease detection result."},
#                                 {"type": "image_url", "image_url": {"url": image_data_url, "detail": "high"}},
#                             ],
#                         },
#                     ],
#                     temperature=0,
#                 )

#                 diagnosis = str(response.choices[0].message.content).strip()
#             except Exception as e:
#                 return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

#             return Response(
#                 {
#                     "id": photo.id,
#                     "image_url": photo.image.url,
#                     "diagnosis": diagnosis,
#                 },
#                 status=status.HTTP_201_CREATED,
#             )
#         else:
#             return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status
from .serializers import PhotoSerializer
from .models import Photo
from openai import OpenAI
from django.conf import settings
import base64

# ✅ Use your real API key from settings or env

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
        serializer = PhotoSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            photo = serializer.save()
            image_data_url = get_image_data_url(photo.image)

            try:
                response = client.chat.completions.create(
                    model="gpt-4.1-mini",  # ✅ vision-capable model
                    messages=[
                        {
                            "role": "system",
                            "content": (
                                "You are an agricultural expert. "
                                "Analyze plant leaf images and detect possible diseases. "
                                "Return the name of the disease (if any), its severity, and recommended treatment. "
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
                    temperature=0,
                )

                diagnosis = str(response.choices[0].message.content).strip()
            except Exception as e:
                return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            # ✅ Build absolute URL
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
