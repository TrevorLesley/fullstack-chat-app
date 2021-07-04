from rest_framework import generics

from .models import Chat

from .permissions import IsAuthOrReadOnly
from .serializers import ChatSerializer

# Create your views here.


class ChatListAPIView(generics.ListCreateAPIView):
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class ChatListDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer
    permission_classes = (IsAuthOrReadOnly,)
