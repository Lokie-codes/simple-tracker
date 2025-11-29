from django.urls import path
from . import views
from . import auth_views

urlpatterns = [
    # Auth endpoints
    path('auth/register/', auth_views.register, name='register'),
    path('auth/login/', auth_views.login, name='login'),
    path('auth/logout/', auth_views.logout, name='logout'),
    path('auth/user/', auth_views.get_user, name='get_user'),
    
    # Schedule endpoints
    path('schedule/', views.save_schedule, name='save_schedule'),
    path('schedule/get/', views.get_schedule, name='get_schedule'),
]