from rest_framework import serializers
from .models import Chore


class ChoreSerializer(serializers.ModelSerializer):
    time = serializers.SerializerMethodField()
    
    class Meta:
        model = Chore
        fields = [
            'id', 'date', 'time_start', 'time_end', 'time',
            'activity', 'category', 'energy_level',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']
    
    def get_time(self, obj):
        return f"{obj.time_start.strftime('%H:%M')} - {obj.time_end.strftime('%H:%M')}"


class ScheduleSubmitSerializer(serializers.Serializer):
    """Serializer for validating schedule submission from frontend"""
    date = serializers.DateField()
    schedule = serializers.ListField(
        child=serializers.DictField()
    )
