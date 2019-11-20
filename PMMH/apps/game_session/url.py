from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('', views.city_view, name='city_view')
]