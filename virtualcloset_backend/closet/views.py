import cloudinary.uploader
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import ClothingItem

class UploadClothingView(APIView):
    def post(self, request):
        file = request.FILES.get('image')
        name = request.data.get('name', 'Unnamed')
        category = request.data.get('category', 'tops')

        if not file:
            return Response({'error': 'No image provided'}, status=400)

        # Upload to Cloudinary
        result = cloudinary.uploader.upload(file, folder=f"virtualcloset/{category}")

        # Save to database
        item = ClothingItem.objects.create(
            name=name,
            category=category,
            image_url=result['secure_url'],
            public_id=result['public_id']
        )

        return Response({
            'id': item.id,
            'name': item.name,
            'category': item.category,
            'image_url': item.image_url,
        }, status=201)


class GetClothingView(APIView):
    def get(self, request):
        category = request.query_params.get('category', None)

        if category:
            items = ClothingItem.objects.filter(category=category)
        else:
            items = ClothingItem.objects.all()

        data = [{
            'id': item.id,
            'name': item.name,
            'category': item.category,
            'image_url': item.image_url,
        } for item in items]

        return Response(data)


class DeleteClothingView(APIView):
    def delete(self, request, item_id):
        try:
            item = ClothingItem.objects.get(id=item_id)
            cloudinary.uploader.destroy(item.public_id)
            item.delete()
            return Response({'message': 'Deleted successfully'})
        except ClothingItem.DoesNotExist:
            return Response({'error': 'Item not found'}, status=404)