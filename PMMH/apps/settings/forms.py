from django import forms


class SettingsForm(forms.Form):
    sfx = forms.IntegerField()
    music = forms.IntegerField()


class SelectGameForm(forms.Form):
    game_name = forms.CharField(max_length=50)
