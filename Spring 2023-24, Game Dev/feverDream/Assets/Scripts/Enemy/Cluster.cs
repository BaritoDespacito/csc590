using System;
using System.Collections;
using UnityEngine;

namespace EnemyGeneration
{
    public class Cluster
    {

        private Vector3 position;
        private ArrayList enemies;

        private static double maxDeviation = 10;
        
        public Cluster(int numEnemies, double maxX, double maxZ, double distFromPlayer, Vector3 playerPos)
        {
            enemies = new ArrayList();
            position = new Vector3((float) (maxX * UnityEngine.Random.value), 0, (float) (maxX * UnityEngine.Random.value));
            
            while (Vector3.Distance(position, playerPos) < distFromPlayer)
            {
                position = new Vector3((float) (maxX * UnityEngine.Random.value), 0, (float) (maxX * UnityEngine.Random.value));
            }
            
            for (var i = 0; i < numEnemies; i++)
            {
                enemies.Add(new Vector3((float) (position.x + UnityEngine.Random.value*maxDeviation), 0, (float) (position.z + UnityEngine.Random.value*maxDeviation)));
            }
        }
        
        public ArrayList GetEnemies()
        {
            return enemies;
        }
    }
}