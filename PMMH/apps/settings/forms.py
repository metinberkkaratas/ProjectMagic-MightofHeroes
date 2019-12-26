from django import forms
from apps.user.models import User
from apps.game.models import Game


class SettingsForm(forms.Form):
    sfx = forms.IntegerField()
    music = forms.IntegerField()


class SelectGameForm(forms.Form):
    game_name = forms.CharField(max_length=50, required=False)
    game_id = forms.IntegerField()


class HostGameForm(forms.ModelForm):
    VICTORY_CHOICES = (
        #('SCORE', 'Score'),
        ('WONDER', 'Wonder'),
        ('DOMINATION', 'Domination')
    )
    MAP_CHOICES = (
        ('MAP1', 'Map 1'),
        ('MAP2', 'Map 2'),
    )

    num_of_turns = forms.IntegerField()
    victory_condition = forms.ChoiceField(choices=VICTORY_CHOICES)
    map = forms.ChoiceField(choices=MAP_CHOICES)

    class Meta:
        model = Game
        fields = (
            'num_of_turns',
            'victory_condition',
            'map'
        )


class HostGameUserForm(forms.ModelForm):
    NATION_CHOICES = (
        ('NAT1', 'Nation1'),
        ('NAT2', 'Nation2'),
        ('NAT3', 'Nation3')
    )

    nation = forms.ChoiceField(choices=NATION_CHOICES)
    status = forms.BooleanField(widget=forms.CheckboxInput(attrs={
        'class': 'checkboxSize'
    }))
    game = HostGameForm(initial=None)

    class Meta:
        model = User
        fields = (
            'nation',
            'status',
            'username',
            'game'
        )

class HostGameButtonForm(forms.Form):
    game_id = forms.IntegerField(required=False)
