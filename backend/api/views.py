from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .utils import save_schedule_chores, get_chores_for_date


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def save_schedule(request):
    """
    Save all chores from the frontend schedule to the database.
    
    Expected payload:
    {
        "date": "2025-11-29",
        "schedule": [
            {
                "id": 1,
                "time": "10:00 - 10:30",
                "activity": "Work",
                "category": "Work",
                "energy": "2"
            }
        ]
    }
    """
    try:
        data = request.data
        date = data.get('date')
        schedule = data.get('schedule', [])
        
        if not date:
            return Response(
                {'error': 'Date is required'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        result = save_schedule_chores(request.user, date, schedule)
        
        return Response(
            {
                'message': 'Schedule saved successfully',
                'chores_count': result['count'],
                'chores': result['chores']
            },
            status=status.HTTP_201_CREATED
        )
    
    except ValueError as e:
        return Response(
            {'error': f'Invalid data format: {str(e)}'},
            status=status.HTTP_400_BAD_REQUEST
        )
    except Exception as e:
        return Response(
            {'error': str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_schedule(request):
    """
    Retrieve chores for a specific date for the logged-in user.
    
    Query parameters:
    - date: Optional. Format: YYYY-MM-DD. If provided, returns chores for that date only.
    
    Example: /api/schedule/get/?date=2025-11-29
    """
    try:
        date = request.query_params.get('date')
        
        if date:
            chores_data = get_chores_for_date(request.user, date)
        else:
            from .models import Chore
            chores = Chore.objects.filter(user=request.user).order_by('-date', 'time_start')
            chores_data = []
            for chore in chores:
                chores_data.append({
                    'id': chore.id,
                    'date': str(chore.date),
                    'time_start': str(chore.time_start),
                    'time_end': str(chore.time_end),
                    'time': f"{chore.time_start.strftime('%H:%M')} - {chore.time_end.strftime('%H:%M')}",
                    'activity': chore.activity,
                    'category': chore.category,
                    'energy_level': chore.energy_level,
                    'created_at': chore.created_at.isoformat(),
                    'updated_at': chore.updated_at.isoformat(),
                })
        
        return Response(
            {
                'chores_count': len(chores_data),
                'chores': chores_data
            },
            status=status.HTTP_200_OK
        )
    
    except Exception as e:
        return Response(
            {'error': str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )
