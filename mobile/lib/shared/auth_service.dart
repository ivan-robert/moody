import 'package:dio/dio.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:flutter/material.dart';
import 'package:moody/shared/api_service.dart';

class AuthService with ChangeNotifier {
  final FlutterSecureStorage _storage = FlutterSecureStorage();
  bool _isLoggedIn = false;

  bool get isLoggedIn => _isLoggedIn;

  AuthService() {
    _checkLoginStatus(); // Initial check of the login status
  }

  Future<void> _checkLoginStatus() async {
    bool loggedInResponse = await attemptLogin();
    print('TON GROS ARON');
    print(loggedInResponse);
    _isLoggedIn = loggedInResponse;
    if (!loggedInResponse) {
      await _storage.deleteAll();
    }
    notifyListeners(); // Notify the listeners whenever the state changes
  }

  Future<bool> createUser(String username) async {
    _isLoggedIn = true;
    Response response =
        await apiService.dio.post("/auth/users/create_user/", data: {
      'username': username,
    });
    if (response.statusCode == 201) {
      var password = response.data["password"];
      var username = response.data["username"];
      _storage.write(key: 'username', value: username);
      _storage.write(key: 'password', value: password);
    }
    notifyListeners(); // Notify that the user is logged in
    return response.statusCode == 201;
  }

  Future<bool> attemptLogin() async {
    var token = await _storage.read(key: 'password');
    var username = await _storage.read(key: 'username');
    if (token == null || username == null) {
      logout();
      return false;
    }
    bool isLoggedInResponse = (await apiService.dio.post('/auth/users/login/',
            data: {"username": username, "password": token}))
        .data;
    if (!isLoggedInResponse) {
      await logout();
    }
    notifyListeners(); // Notify that the user is logged in
    return isLoggedInResponse;
  }

  Future<void> logout() async {
    await _storage.deleteAll();
    _isLoggedIn = false;
    notifyListeners(); // Notify that the user is logged out
  }
}

final authService = AuthService();
