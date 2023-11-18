# React Native Social App with Supabase
Making a basic hidden social media application with Supabase. (The aim is to understand the use of Supabase with React Native)

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![GPLv3 License](https://img.shields.io/badge/License-GPL%20v3-yellow.svg)](https://opensource.org/licenses/)
[![AGPL License](https://img.shields.io/badge/license-AGPL-blue.svg)](http://www.gnu.org/licenses/agpl-3.0)

## Kullanılan Teknolojiler

* Expo CLI
* React Native
* Supabase Auth, Databases & Real Time Dataase
* React-Navigation v6
* Redux Toolkit
* Custom Font
* Secure Store

## Bilgisayarınızda Çalıştırın

Projeyi klonlayın

```bash
  git clone https://github.com/burakgokcinarr/rn-supagram-social-app.git
```

Proje dizinine gidin

```bash
  cd app-project
```

Gerekli paketleri yükleyin

```bash
  npm install or yarn install or bun install
```
Proje Yapılandırılması ( ÖNEMLİ )

```bash
 Adım 1) https://supabase.com/ adresinden hesap oluşturun.
 Adım 2) proje ana dizinine ".env" isimli bir dosya oluşturun ve aşağıdaki uygun yerleri supabase hesabınızın API KEY'lerini değiştirin.
    EXPO_PUBLIC_API_URL=https://xxxxxxxxxxxx.supabase.co
    EXPO_PUBLIC_API_KEY=xxxxxxxxxx....xxxxxx
```

Cihazlarda çalıştırın ( iOS Simulator & Android Emulator or Real Devices )

```bash
  npx expo start
```
```bash
  for iOS           => Press Keyboard (i)
  for Android       => Press Keyboard (a)
  or
  Your Real Device  => Expo App Scan QRCode
```

NOT: Ayarları doğru bir şekilde uyguladıysanız artık https://supabase.com/dashboard/projects adresi üzerinden User Authorization & Database/Real Time Feature verilerinizi takip edebilirsiniz.

<p align="center">
  <img src="https://github.com/burakgokcinarr/rn-supagram-social-app/blob/main/demo3.gif" alt="img" width="500" height="800">
</p>
