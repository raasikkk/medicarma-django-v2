from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
# FORM
from .forms import RegisterForm
from .models import Products
# Create your views here.

def register_view(request):
    if request.method == "POST":
        form = RegisterForm(request.POST)
        if form.is_valid():
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            user = User.objects.create_user(username=username, password=password)
            login(request, user)
            return redirect('home')
    else:
        form = RegisterForm()
    return render(request, 'accounts/register.html', {'form': form})

def login_view(request):
    error_message = None
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(username=username, password=password)

        if user is not None:
            login(request, user)
            next_url = request.POST.get('next') or request.GET.get('next') or 'home'
            return redirect(next_url)
        else:
            error_message = "Invalid username and password"
    return render(request, 'accounts/login.html', {'error': error_message})

def logout_view(request):
    if request.method == 'POST':
        logout(request)
        return redirect('login')
    else:
        return redirect('home')

@login_required
def home_view(request):
    products = Products.objects.all()[:4]
    return render(request, 'home/home.html', {'products': products})

@login_required
def protected_view(request):
    products = Products.objects.all()
    return render(request, 'products/products.html', {'products': products})