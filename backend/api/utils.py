from datetime import datetime
from .models import Chore


def parse_time_range(time_str):
    """
    Parse a time range string like '10:00 - 10:30' into start and end times.
    
    Args:
        time_str: String in format 'HH:MM - HH:MM'
    
    Returns:
        tuple: (time_start, time_end) or (None, None) if parsing fails
    """
    try:
        time_parts = time_str.split(' - ')
        if len(time_parts) != 2:
            return None, None
        
        time_start = datetime.strptime(time_parts[0].strip(), '%H:%M').time()
        time_end = datetime.strptime(time_parts[1].strip(), '%H:%M').time()
        return time_start, time_end
    except (ValueError, IndexError, AttributeError):
        return None, None


def save_schedule_chores(user, date, schedule_items):
    """
    Save or update chores from a schedule submission.
    
    Args:
        user: Django User instance
        date: Date string in YYYY-MM-DD format
        schedule_items: List of chore dicts with activity, category, energy, time
    
    Returns:
        dict: Contains 'count' (number of saved chores) and 'chores' (list of saved chore data)
    """
    created_chores = []
    
    for item in schedule_items:
        # Skip empty activities
        if not item.get('activity', '').strip():
            continue
        
        # Parse time range
        time_str = item.get('time', '')
        time_start, time_end = parse_time_range(time_str)
        
        if not time_start or not time_end:
            continue
        
        try:
            # Create or update chore
            chore, _ = Chore.objects.update_or_create(
                user=user,
                date=date,
                time_start=time_start,
                time_end=time_end,
                defaults={
                    'activity': item.get('activity', '').strip(),
                    'category': item.get('category', ''),
                    'energy_level': int(item.get('energy')) if item.get('energy') else None,
                }
            )
            
            created_chores.append({
                'id': chore.id,
                'activity': chore.activity,
                'category': chore.category,
                'energy_level': chore.energy_level,
                'time': f"{chore.time_start.strftime('%H:%M')} - {chore.time_end.strftime('%H:%M')}"
            })
        except (ValueError, TypeError) as e:
            # Log error but continue with next item
            continue
    
    return {
        'count': len(created_chores),
        'chores': created_chores
    }


def get_chores_for_date(user, date):
    """
    Retrieve all chores for a specific date for the given user.
    
    Args:
        user: Django User instance
        date: Date string in YYYY-MM-DD format
    
    Returns:
        list: List of chore dicts
    """
    chores = Chore.objects.filter(user=user, date=date).order_by('time_start')
    
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
    
    return chores_data
