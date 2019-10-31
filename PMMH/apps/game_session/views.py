from django.shortcuts import render
from .models import GameSession

# Create your views here.
def index(requst):
    game_sessions = GameSession.objects.order_by('users')
    context = {
        'game_sessions': game_sessions,
    }
    return render(requst, 'game_session/index.html', context)