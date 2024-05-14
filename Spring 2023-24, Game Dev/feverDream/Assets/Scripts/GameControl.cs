using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class GameControl : MonoBehaviour
{
    
    public int numClusters = 5;
    public int numEnemies = 10;
    public double distFromPlayer = 25;
    private ArrayList clusters = new ArrayList();
    
    [SerializeField] private GameObject _enemyPrefab;
    
    [SerializeField] private bool generateEnemies = true;
    
    // Start is called before the first frame update
    void Start()
    {
        var player = GameObject.FindWithTag("Player");
        
        if (!generateEnemies) return;
        
        for (var i = 0; i < numClusters; i++)
        {
            clusters.Add(new EnemyGeneration.Cluster(numEnemies, 90, 90, distFromPlayer, player.transform.position));
        }
        
        foreach (EnemyGeneration.Cluster cluster in clusters)
        {
            foreach (Vector3 enemy in cluster.GetEnemies())
            {
                Instantiate(_enemyPrefab, enemy, Quaternion.identity);
            }
        }
    }

    // Update is called once per frame
    void Update()
    {
        
    }
}
