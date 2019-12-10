from django.urls import path
from . import views

urlpatterns = [
    path('', views.lobby, name='Lobby'),
    path('host_game', views.host_game, name='Host Game'),
    path('join_game', views.host_game, name='Join Game'),
    path('lobby/<str:name>', views.game_room, name='Game')
]
