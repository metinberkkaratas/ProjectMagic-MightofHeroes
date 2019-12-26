from django.urls import path
from . import views

urlpatterns = [
    path('', views.lobby, name='lobby'),
    path('host_game/<str:id>', views.host_game, name='host_game'),
    path('join_game/<str:id>', views.host_game, name='join_game'),
    path('lobby/<int:id>', views.game_room, name='game')
]
