import 'dart:io';

import 'package:dio/dio.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

final baseUrl = 'http://0.0.0.0:8000';

class ApiService {
  // Singleton pattern
  static final ApiService _apiService = ApiService._internal();
  factory ApiService() => _apiService;

  Future<String> requestToken() async {
    String token = await dio.post("$baseUrl/auth/token") as String;
    return token;
  }

  ApiService._internal() {
    dio = Dio(_options);

    // Add an interceptor to include the auth token in requests
    dio.interceptors.add(
      InterceptorsWrapper(
        onRequest: (options, handler) async {
          String? token = await _storage.read(key: 'auth_token');
          if (token == null) {
            return handler.next(options);
            // var token = await requestToken();
            // await _storage.write(key: 'auth_token', value: token);
          }
          options.headers['Authorization'] = 'Bearer $token';
          return handler.next(options);
        },
        onError: (DioException e, handler) async {
          return stderr.writeln("an error was intercepted: $e");

          if (e.response?.statusCode == 401 &&
              (e.requestOptions.extra['retries'] ?? 0) < 1) {
            // Token invalid, generate a new one
            await _storage.delete(key: 'auth_token');
            try {
              var token = await requestToken();
              await _storage.write(key: 'auth_token', value: token);
              final options = e.requestOptions;
              options.headers['Authorization'] = 'Bearer $token';
              options.extra['retries'] = (options.extra['retries'] ?? 0) + 1;

              final response = await dio.request(
                options.path,
                options: Options(
                  method: options.method,
                  headers: options.headers,
                  responseType: options.responseType,
                  contentType: options.contentType,
                  followRedirects: options.followRedirects,
                  validateStatus: options.validateStatus,
                  receiveDataWhenStatusError:
                      options.receiveDataWhenStatusError,
                  extra: options.extra,
                ),
                data: options.data,
                queryParameters: options.queryParameters,
              );
              return handler.resolve(response);
            } catch (e) {
              return handler.reject(e as DioException);
            }
          }
          return handler.next(e);
        },
      ),
    );
  }

  late Dio dio;
  final _storage = FlutterSecureStorage();

  final BaseOptions _options = BaseOptions(
    baseUrl: baseUrl,
    connectTimeout: const Duration(seconds: 5),
    receiveTimeout: const Duration(seconds: 3),
  );
}

final apiService = ApiService();
