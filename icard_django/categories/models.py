from django.db import models

#Crear Apartado de Categorias

class Category(models.Model):
    title = models.CharField(max_length=100)
    image = models.ImageField(upload_to='categories')

    def __str__(self):
        return self.title