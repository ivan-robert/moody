import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:moody/shared/api_service.dart';
import 'send_message.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

class LoginPage extends StatefulWidget {
  @override
  _LoginPageState createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  final TextEditingController _usernameController = TextEditingController();
  final _storage = FlutterSecureStorage();

  void _createUser() async {
    String username = _usernameController.text.trim();

    Response response =
        await apiService.dio.post("/auth/users/create_user/", data: {
      'username': username,
    });

    var password = response.data;
    _storage.write(key: 'auth_token', value: password);

    if (response.statusCode == 201) {
      Navigator.pushReplacement(
        context,
        MaterialPageRoute(builder: (context) => SendMessagePage()),
      );
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Login failed')),
      );
    }
  }

  @override
  void dispose() {
    _usernameController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Login'),
      ),
      body: Padding(
        padding: EdgeInsets.all(16.0),
        child: Column(
          children: [
            TextField(
              controller: _usernameController,
              decoration: InputDecoration(
                labelText: 'Username',
                border: OutlineInputBorder(),
              ),
            ),
            SizedBox(height: 16.0),
            ElevatedButton(
              onPressed: _createUser,
              child: Text('Login'),
            ),
          ],
        ),
      ),
    );
  }
}
