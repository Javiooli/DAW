from django.shortcuts import render
from .models import Author, Book

# Create your views here.

def index(request):
    num_books = Book.objects.count()
    num_authors = Author.objects.count()

    context = {
        'num_books': num_books,
        'num_authors': num_authors,
    }

    return render(request, 'index.html', context=context)


def book_list(request):
    books = Book.objects.select_related('author').all()
    return render(request, 'book_list.html', {'book_list': books})


def author_list(request):
    authors = Author.objects.all()
    return render(request, 'author_list.html', {'author_list': authors})