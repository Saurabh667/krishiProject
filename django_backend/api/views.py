from django.shortcuts import render
from .models import Message
from .serializer import MessageSerializer
from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from openai import OpenAI
import random
from django.views.decorators.csrf import csrf_exempt
import os

GITHUB_TOKEN = os.getenv("GITHUB_TOKEN")

# Initialize OpenAI client
endpoint = "https://models.github.ai/inference"
model = "openai/gpt-4.1"
client = OpenAI(base_url=endpoint, api_key=token)


class MessageViewSet(viewsets.ModelViewSet):
    queryset = Message.objects.all().order_by('-created_at')
    serializer_class = MessageSerializer


@csrf_exempt
@api_view(['POST'])
def chatgpt_reply(request):
    user_text = request.data.get("text", "")
    if not user_text:
        return Response({"error": "No text provided"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        # Call the GPT API
        response = client.chat.completions.create(
            model=model,
            messages=[
                {
                    "role": "system",
                    "content": "You are a helpful assistant that helps farmers in India in Hindi. If you don't know the answer, say you don't know."
                },
                {"role": "user", "content": user_text}
            ],
            temperature=1,
            top_p=1
        )

        reply_text = response.choices[0].message.content

        # Save ChatGPT reply to DB
        chatgpt_message = Message.objects.create(
            text=reply_text,
            sender="Ai Model"
        )
        serializer = MessageSerializer(chatgpt_message)
        return Response(serializer.data, status=status.HTTP_200_OK)

    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
