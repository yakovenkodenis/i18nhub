from rest_framework_hstore.serializers import HStoreSerializer

from home.models import Translation


class TranslationSerializer(HStoreSerializer):
    class Meta:
        models = Translation
