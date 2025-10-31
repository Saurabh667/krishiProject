from rest_framework import serializers
from .models import Photo

class PhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Photo
        fields = ['id', 'image', 'uploaded_at','description']
    
    def validate_image(self, value):
        if value.size > 5 * 1024 * 1024:  
            raise serializers.ValidationError("Image size should not exceed 5MB.")
        return value