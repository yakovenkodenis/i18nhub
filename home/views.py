from django.shortcuts import render
from django.contrib.auth.models import User
from django.contrib.auth.mixins import LoginRequiredMixin
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer

import json

from .serializers import (
    UserSerializer,
    ProjectSerializer,
    TranslationSerializer
)
from .models import (
    Project,
    Translation
)


@api_view(['GET'])
def get_all_users(request):
    if request.user.is_staff:
        return Response(UserSerializer(User.objects.all(), many=True).data)
    else:
        return Response({'error': 'Permission denied'})


@api_view(['GET'])
def get_current_user(request):
    return Response(UserSerializer(request.user).data)


@api_view(['GET'])
def get_all_projects(request):
    projects = Project.objects.all()
    return Response(ProjectSerializer(projects, many=True).data)


@api_view(['GET'])
def get_project_by_id(request, project_id):
    try:
        project = Project.objects.get(user=request.user, id=project_id)
        return Response(ProjectSerializer(project).data)
    except:
        return Response({'error': 'Project not found'})


@api_view(['POST'])
def create_project(request):
    try:
        project = Project()
        project.user = request.user
        project.name = request.POST.get('project_name')
        project.description = request.POST.get('project_desc')
        project.save()
        return Response(ProjectSerializer(project).data)
    except:
        return Response({'error': 'Could not create project'})


@api_view(['PUT'])
def update_project(request):
    try:
        project_id = request.data.get('project_id')
        name = request.data.get('name', '')
        description = request.data.get('description', '')

        project = Project.objects.get(id=project_id, user=request.user)
        project.name = name if name else project.name
        project.description = description if description else project.description
        project.save()
        return Response(ProjectSerializer(project).data)
    except:
        return Response({'error': 'Project could not be updated'})


@api_view(['DELETE'])
def delete_project(request):
    try:
        project_id = request.data.get('project_id')
        project = Project.objects.get(id=project_id, user=request.user)
        project.delete()
        return Response(ProjectSerializer(project).data)
    except:
        return Response({'error': 'Could not delete project'})


@api_view(['GET'])
def get_translations(request, project_id):
    try:
        project = Project.objects.get(user=request.user, id=project_id)
        translations = Translation.objects.filter(project=project)
        return Response(TranslationSerializer(translations, many=True).data)
    except:
        return Response({'error': 'Translations not found'})


@api_view(['GET'])
def get_translation(request, project_id, lang):
    try:
        project = Project.objects.get(user=request.user, id=project_id)
        translation = Translation.objects.get(project=project, language=lang)
        return Response(TranslationSerializer(translation).data)
    except:
        return Response({'error': 'Translation not found'})


@api_view(['POST'])
def create_translation(request):
    try:
        body = json.loads(request.body.decode('utf-8').replace("\'", "\""))
        project_id = int(body['project_id'])
        lang = body['lang']
        values = body['values']

        translation = Translation()
        translation.project = Project.objects.get(user=request.user, id=project_id)
        translation.language = lang
        translation.values = values
        translation.save()
        return Response(TranslationSerializer(translation).data)
    except:
        return Response({'error': 'Translation could not be created'})


@api_view(['PUT'])
def update_translation(request):
    try:
        project_id = request.data.get('project_id')
        lang = request.data.get('lang', '')
        key = request.data.get('key', '')
        value = request.data.get('value', '')

        project = Project.objects.get(user=request.user, id=project_id)
        translation = Translation.objects.get(project=project, language=lang)
        translation.values[key] = value if key else translation.values[key]
        translation.save()
        return Response(TranslationSerializer(translation).data)
    except:
        return Response({'error': 'Translation could not be updated'})


@api_view(['PUT'])
def remove_translation_value(request):
    try:
        project_id = request.data.get('project_id')
        lang = request.data.get('lang')
        key = request.data.get('key')

        project = Project.objects.get(user=request.user, id=project_id)
        translation = Translation.objects.get(project=project, language=lang)

        del translation.values[key]
        translation.save()
        return Response(TranslationSerializer(translation).data)
    except:
        return Response({'error': 'Could not remove translation key'})


@api_view(['DELETE'])
def delete_translation(request):
    try:
        project_id = request.data.get('project_id')
        lang = request.data.get('lang')

        project = Project.objects.get(user=request.user, id=project_id)
        translation = Translation.objects.get(project=project,language=lang)
        translation.delete()
        return Response(TranslationSerializer(translation).data)
    except:
        return Response({'error': 'Could not delete translation'})
