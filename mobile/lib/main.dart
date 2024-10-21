import 'package:flutter/material.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:moody/pages/login_page.dart';
import 'package:moody/pages/send_message.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  final _storage = FlutterSecureStorage();

  Future<bool> _isLoggedIn() async {
    String? token = await _storage.read(key: 'auth_token');
    return token != null;
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Messaging App',
      routes: {
        '/login': (context) => LoginPage(),
        '/send-message': (context) => SendMessagePage(),
      },
      home: FutureBuilder(
        future: _isLoggedIn(),
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            // Loading indicator
            return Scaffold(
              body: Center(child: CircularProgressIndicator()),
            );
          } else {
            if (snapshot.data == true) {
              return SendMessagePage();
            } else {
              return LoginPage();
            }
          }
        },
      ),
    );
  }
}
