from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from home.serializers import UserSerializer


@api_view(['POST'])
def signup(request):
    serialized = UserSerializer(data=request.DATA)
    if serialized.is_valid():
        User.objects.create_user(
            serialized.init_data['email'],
            serialized.init_data['username'],
            serialized.init_data['password'],
            serialized.init_data['first_name'],
            serialized.init_data['last_name']
        )
        return Response(serialized.data, status=status.HTTP_201_CREATED)
    else:
        return Response(serialized.data, status=status.HTTP_400_BAD_REQUEST)
