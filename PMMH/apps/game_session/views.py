from django.shortcuts import render
from .models import GameSession

# Create your views here.
def city_view(request):
    return render(request, 'overworld/city_view.html', {})
    
def index(request):
    game_sessions = GameSession.objects.order_by('users')
    context = {
        'game_sessions': game_sessions,
    }
    return render(request, 'overworld/city_view.html', context)


