from django.http import HttpResponseRedirect
from django.shortcuts import render

from .forms import LoginForm
from .models import User
from apps.settings.models import Settings


def login(request):
    # TODO delete user when session end signal comes
    if request.session.get('username', False):
        return HttpResponseRedirect('/game_rooms')
    login_form = LoginForm()
    if request.method == 'POST':
        form = LoginForm(request.POST)
        if form.is_valid():
            settings = Settings.objects.create()
            user = User.objects.create(username=form.cleaned_data['username'], settings=settings)
            if not (user.save()):
                print("Username " + user.username + " already in used!")
                return render(request, 'index.html', {'form': login_form})
            request.session['username'] = user.username
            return HttpResponseRedirect('/game_rooms')
    return render(request, 'index.html', {'form': login_form})
