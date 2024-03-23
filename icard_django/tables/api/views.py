from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from tables.models import Table
from tables.api.serializers import TableSerializer

class TableApiViewSet(ModelViewSet):
    permission_classes = [IsAuthenticatedOrReadOnly]
    serializer_class = TableSerializer
    queryset =  Table.objects.all().order_by('number')