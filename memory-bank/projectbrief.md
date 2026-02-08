# Project Brief: AtAccelerator (TV Show Finder)

## Overview
A lightweight Angular 18 application for discovering and tracking TV shows. Users can search the Episodate database, view show details, and maintain a personal list of favorite shows.

## Key Features
- **TV Show Search**: Search using the Episodate public API.
- **Show Details**: Display show metadata returned by Episodate.
- **Favorites Management**: Add/remove shows to a local favorites list (stored in Local Storage and rehydrated on load).
- **Responsive Design**: Clean, minimalist UI built with `mini.css`.

## Technical Stack
- **Framework**: Angular 18 (NgModule-based app with some standalone components)
- **State Management**: Angular Signals for reactive state
- **CSS Framework**: mini.css (v3.0.1)
- **Data Persistence**: Local Storage (`favorites` key)
- **API Integration**: Episodate API (`https://www.episodate.com/api/`)
- **Testing**: Karma/Jasmine
