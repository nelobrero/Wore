from django.urls import path
from .views import UploadClothingView, GetClothingView, DeleteClothingView

urlpatterns = [
    path('upload/', UploadClothingView.as_view(), name='upload'),
    path('items/', GetClothingView.as_view(), name='get-items'),
    path('items/<int:item_id>/', DeleteClothingView.as_view(), name='delete-item'),
]