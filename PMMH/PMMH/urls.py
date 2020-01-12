"""PMMH URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from apps.user.urls import urlpatterns as user_url
from apps.settings.urls import urlpatterns as settings_url
from apps.game.urls import urlpatterns as game_url
from apps.game.chat.urls import urlpatterns as chat_url

urlpatterns = [
    path('admin/', admin.site.urls),
    path('chat/', include(chat_url)),
    path('', include(user_url)),
    path('game_rooms/', include(settings_url)),
    path('game/', include(game_url)),
    path('chat/', include(chat_url))

]
