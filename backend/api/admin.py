from django.contrib import admin
from .models import Chore


@admin.register(Chore)
class ChoreAdmin(admin.ModelAdmin):
    list_display = ['date', 'time_start', 'time_end', 'activity', 'category', 'energy_level', 'created_at']
    list_filter = ['date', 'category', 'energy_level']
    search_fields = ['activity']
    ordering = ['-date', 'time_start']
    
    fieldsets = (
        ('Schedule Information', {
            'fields': ('date', 'time_start', 'time_end')
        }),
        ('Activity Details', {
            'fields': ('activity', 'category', 'energy_level')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    
    readonly_fields = ('created_at', 'updated_at')
