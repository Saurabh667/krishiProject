from django.db import models

# Create your models here.
class Message(models.Model):
    text=models.TextField()
    sender = models.CharField(max_length=120, blank=True, null=True) 
    created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return f"{self.sender or 'anon'}: {self.text[:50]}"