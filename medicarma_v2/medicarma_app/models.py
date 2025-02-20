from django.db import models

# Create your models here.
class Products(models.Model):
    name = models.CharField(max_length=200)
    description = models.CharField(max_length=200)
    image = models.ImageField(upload_to='products/')

    def __str__(self):
        return self.name