from django.db import models

# Create your models here.
class Photo(models.Model):
    image = models.ImageField(upload_to='photos/')
    uploaded_at = models.DateTimeField(auto_now_add=True)
    description = models.TextField(blank=True, null=True)  # GPT output stored here


    def __str__(self):
        return f"Photo {self.id} - {self.image.name}"