# # api/urls.py
# from rest_framework.routers import DefaultRouter
# from .views import MessageViewSet  # make sure this exists

# router = DefaultRouter()
# router.register(r"messages", MessageViewSet, basename="message")

# urlpatterns = router.urls

from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import MessageViewSet, chatgpt_reply

router = DefaultRouter()
router.register(r"messages", MessageViewSet, basename="message")

urlpatterns = [
    path("", include(router.urls)),          # /api/messages/
    path("chatgpt/", chatgpt_reply, name="chatgpt_reply"),  # /api/chatgpt/
]
