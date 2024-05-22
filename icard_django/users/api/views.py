from rest_framework.viewsets import ModelViewSet
from rest_framework.views import APIView
from rest_framework.permissions import IsAdminUser,IsAuthenticated
from rest_framework.response import Response
from django.contrib.auth.hashers import make_password

from users.api.serializers import UserSerializer

from users.models import User

#CRUD completo de Usuario

class UserApiViewSet(ModelViewSet):
    permission_classes=[IsAdminUser]
    serializer_class = UserSerializer
    queryset=User.objects.all()

    #ENCRIPTAR CONTRASEÑA AL CREAR USUARIO
    def create(self, request, *args, **kwargs):
        request.data['password'] = make_password(request.data['password'])
        return super().create(request,*args,**kwargs)
    
    #ENCRIPTAR CONTRASEÑA AL ACTUALIZAR
    def partial_update(self, request, *args, **kwargs):
        password = request.data['password']
        if password:
            request.data['password'] = make_password(password)
        else:
            request.data['passwprd'] = request.user.password
        return super().update(request,*args,**kwargs)
    


class UserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)