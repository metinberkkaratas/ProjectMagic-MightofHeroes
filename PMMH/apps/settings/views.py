from django.shortcuts import render
from .forms import SettingsForm, SelectGameForm
from apps.game.models import Game
from django.http import HttpResponseRedirect


def settings_panel_generator(request):
    if request.method == 'POST':
        form = SettingsForm()
        if form.is_valid():
            pass

    else:
        form = SettingsForm()

    return form


def lobby(request):
    if not request.session.get('username', False):
        return HttpResponseRedirect('/')
    game_forms = []
    for game in Game.objects.all().values_list('name', flat=True):
        game_form = SelectGameForm().game_name
        game_form.game_name = game
        game_forms.append(game_form)

    return render(request,
                  'game_rooms.html',
                  {
                      'settings': settings_panel_generator(request),
                      'games_forms': game_forms
                  })


def game_room(request, room_game):
    return render(request, 'host_game.html')


def host_game(request):
    return render(request, 'host_game.html')


def join_room(request, room_game):
    return render(request, 'join_game.html')
