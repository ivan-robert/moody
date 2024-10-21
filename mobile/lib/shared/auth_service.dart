import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:flutter/material.dart';

class AuthService with ChangeNotifier {
  final FlutterSecureStorage _storage = FlutterSecureStorage();
  bool _isLoggedIn = false;

  bool get isLoggedIn => _isLoggedIn;

  AuthService() {
    _checkLoginStatus(); // Initial check of the login status
  }

  Future<void> _checkLoginStatus() async {
    String? token = await _storage.read(key: 'auth_token');
    _isLoggedIn = token != null;
    print("ROKEN: $token");
    notifyListeners(); // Notify the listeners whenever the state changes
  }

  Future<void> login(String token) async {
    await _storage.write(key: 'auth_token', value: token);
    _isLoggedIn = true;
    notifyListeners(); // Notify that the user is logged in
  }

  Future<void> logout() async {
    await _storage.delete(key: 'auth_token');
    _isLoggedIn = false;
    notifyListeners(); // Notify that the user is logged out
  }
}

final authService = AuthService();
