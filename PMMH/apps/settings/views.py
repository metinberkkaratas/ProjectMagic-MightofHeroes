from django.shortcuts import render
from .forms import SettingsForm, SelectGameForm, HostGameForm, HostGameButtonForm, HostGameUserForm
from ..user.models import User
from apps.game.resources.models import Resources
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
    if not request.session.get('id', False):
        return HttpResponseRedirect('/')
    if request.method == 'POST':
        host_game_form = HostGameButtonForm(request.POST)
        select_form = SelectGameForm(request.POST)
        current_user = User.objects.get(id=request.session.get('id', False))
        if select_form.is_valid():
            game_id = select_form.cleaned_data['game_id']
            current_user.nation = 'NAT2'
            if current_user.game is not None:
                User.objects.get(id=current_user.id, game=current_user.game.id).delete()
            if len(User.objects.all().filter(game=game_id)) < 3:
                current_user.game = Game.objects.get(id=game_id)
                current_user.save()
                request.session['join'] = True
                return HttpResponseRedirect('join_game/' + str(select_form.cleaned_data['game_id']))
        elif host_game_form.is_valid():
            if current_user.game is not None:
                Game.objects.get(id=current_user.game.id).delete()
            request.session['join'] = False
            current_user.game = Game.objects.create(name=current_user.username + "'s game",
                                                resource=Resources.objects.create())
            current_user.save()
            return HttpResponseRedirect('host_game/' + str(current_user.game.id))
    game_forms = []
    for game in Game.objects.all():
        game_form = SelectGameForm(initial={'game_name': game.name, 'game_id': game.id})
        game_forms.append(game_form)
    host_game_form = HostGameForm(request.POST)
    return render(request,
                  'game_rooms.html',
                  {
                      'settings': settings_panel_generator(request),
                      'games_forms': game_forms,
                      'host_game_form': host_game_form
                  })


def game_room(request, room_game):
    return render(request, 'host_game.html')


def host_game(request, id):
    if not request.session.get('id', False):
        return HttpResponseRedirect('/')
    current_user = User.objects.get(id=request.session.get('id', False))
    if request.method == 'POST':
        host_game_user_form = HostGameUserForm(request.POST or None)
        host_game_form = HostGameForm(request.POST or None)
        return HttpResponseRedirect('/game/' + str(id))

    game_settings_initial = {
        'number_of_turns': current_user.game.num_of_turns,
        'victory_condition': current_user.game.victory_condition,
        'map': current_user.game.map
    }
    players = []
    for user in User.objects.all().filter(game=id):
        initial_form = {
            'username': user.username,
            'status': user.status,
            'nation': user.nation
        }
        host_game_user_form = HostGameUserForm(request.POST or None, initial=initial_form)
        if user.id == current_user.id:
            host_game_user_form.fields['status'].widget.attrs['disabled'] = False
            host_game_user_form.fields['nation'].widget.attrs['disabled'] = False
        else:
            host_game_user_form.fields['status'].widget.attrs['disabled'] = True
            host_game_user_form.fields['nation'].widget.attrs['disabled'] = True
        players.append(host_game_user_form)
    host_game_form = HostGameForm(request.POST or None, initial=game_settings_initial)
    host_game_form.fields['victory_condition'].widget.attrs['disabled'] = request.session.get('join')
    host_game_form.fields['map'].widget.attrs['disabled'] = request.session.get('join')

    if host_game_form.is_valid() and host_game_user_form.is_valid():
        game = host_game_form.save()
        game_user = host_game_user_form.save()
    return render(request, 'host_game.html', {'players': players,'host_game_form': host_game_form})


def join_room(request, room_game):

    return render(request, 'join_game.html')
