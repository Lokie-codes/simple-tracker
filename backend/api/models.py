from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Chore(models.Model):
    CATEGORY_CHOICES = [
        ('Work', 'Work'),
        ('Exercise', 'Exercise'),
        ('Learning', 'Learning'),
        ('Break', 'Break'),
        ('Personal', 'Personal'),
    ]
    
    ENERGY_CHOICES = [
        (1, 'Low'),
        (2, 'Medium'),
        (3, 'High'),
    ]
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='chores', null=True, blank=True)
    date = models.DateField()
    time_start = models.TimeField()
    time_end = models.TimeField()
    activity = models.CharField(max_length=255, blank=True)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, blank=True)
    energy_level = models.IntegerField(choices=ENERGY_CHOICES, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['date', 'time_start']
        verbose_name_plural = 'Chores'
        unique_together = ('user', 'date', 'time_start', 'time_end')
    
    def __str__(self):
        return f"{self.date} - {self.activity} ({self.time_start}-{self.time_end})"