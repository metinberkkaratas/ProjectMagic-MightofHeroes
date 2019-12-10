from django.urls import path
from . import views

urlpatterns = [
    path('ground', views.battle_ground, name='Ground Battle'),
    path('naval', views.battle_naval, name='Naval Battle'),
]

