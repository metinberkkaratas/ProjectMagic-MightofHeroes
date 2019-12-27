from django.shortcuts import render


def overworld(request, id):
    
    return render(request, 'overworld/overworld_base.html')


def waiting(request):
    pass
