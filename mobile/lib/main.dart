import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:moody/shared/auth_service.dart';
import 'pages/login_page.dart';
import 'pages/send_message.dart';

void main() {
  runApp(
    ChangeNotifierProvider(
      create: (_) => authService, // Providing the AuthService
      child: MyApp(),
    ),
  );
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Messaging App',
      routes: {
        '/login': (context) => LoginPage(),
        '/send-message': (context) => SendMessagePage(),
      },
      home: Consumer<AuthService>(
        builder: (context, authService, child) {
          if (authService.isLoggedIn) {
            return SendMessagePage();
          } else {
            return LoginPage();
          }
        },
      ),
    );
  }
}
