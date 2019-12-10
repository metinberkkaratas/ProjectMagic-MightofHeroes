from django.http import HttpResponseRedirect
from django.shortcuts import render

from .forms import LoginForm
from .models import User
from apps.settings.models import Settings


def login(request):
    if request.method == 'POST':
        form = LoginForm(request.POST)
        if form.is_valid():
            settings = Settings.objects.create()
            user = User.objects.create(username=form.cleaned_data['username'], settings=settings)
            try:
                # TODO need to override save method
                user.save()
                # TODO return a auth token
                request.session['username'] = user.username
            except:
                print("Username already in used!")
                form = LoginForm()
                return render(request, 'index.html', {'form': form})

            return HttpResponseRedirect('/game_rooms')
    else:
        login_form = LoginForm()
    return render(request, 'index.html', {'form': login_form})
