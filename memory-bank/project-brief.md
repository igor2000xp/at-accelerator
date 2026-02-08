# Project Brief: AtAccelerator (TV Show Finder)

## Overview
A lightweight Angular 18 application for discovering and tracking TV shows. Users can search the Episodate database, view detailed information about series, and maintain a personal list of favorite shows.

## Key Features
- **TV Show Search**: Real-time search using the Episodate public API.
- **Show Details**: Comprehensive information including status, network, and premier dates.
- **Favorites Management**: Save shows to a local list for quick access (persisted via Local Storage).
- **Responsive Design**: Clean, minimalist UI built with `mini.css`.

## Technical Stack
- **Framework**: Angular 18 (Standalone Components & Signals)
- **State Management**: Angular Signals for reactive state
- **CSS Framework**: mini.css (v3.0.1)
- **Data Persistence**: Local Storage (`favorites` key)
- **API Integration**: Episodate API (`https://www.episodate.com/api/`)
- **Testing**: Karma/Jasmine
