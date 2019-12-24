from django.shortcuts import render


def overworld(request):
    return render(request, 'overworld/overworld_base.html')


def waiting(request):
    pass
