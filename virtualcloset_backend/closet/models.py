from django.db import models

class ClothingItem(models.Model):
    CATEGORY_CHOICES = [
        ('tops', 'Tops'),
        ('pants', 'Pants'),
        ('shoes', 'Shoes'),
        ('bags', 'Bags'),
        ('accessories', 'Accessories'),
        ('belts', 'Belts'),
    ]

    name = models.CharField(max_length=200)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    image_url = models.URLField()
    public_id = models.CharField(max_length=200)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} ({self.category})"