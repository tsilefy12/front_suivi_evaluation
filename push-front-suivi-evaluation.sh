#!/bin/bash

git add .
echo "commit de la correction SE"
git commit -m "correction suivi evaluation"
echo "push de la correction"
git push origin develop
echo "changer branche dans marohavana"
git checkout marohavana
echo "faire un pull via branche develop"
git pull origin develop
echo "retoruner a la branche develop"
git checkout develop

echo "fin  du travail"
