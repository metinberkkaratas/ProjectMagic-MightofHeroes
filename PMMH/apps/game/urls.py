from django.urls import path, include
from . import views
from apps.game.battlefield.urls import urlpatterns as battlefield_url
from apps.game.city import views as city_views

urlpatterns = [
    path('<str:id>', views.overworld, name='over_world'),
    path('waiting', views.waiting, name='waiting_others'),
    path('city/<str:name>', city_views.city, name='City'),
    path('battlefield', include(battlefield_url)),

]
