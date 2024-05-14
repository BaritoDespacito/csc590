using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class GameControl : MonoBehaviour
{
    
    public int numClusters = 5;
    public int numEnemies = 10;
    private ArrayList clusters = new ArrayList();
    
    [SerializeField] private GameObject _enemyPrefab;
    
    [SerializeField] private bool generateEnemies = true;
    
    // Start is called before the first frame update
    void Start()
    {
        if (!generateEnemies) return;
        
        for (var i = 0; i < numClusters; i++)
        {
            clusters.Add(new EnemyGeneration.Cluster(numEnemies, 90, 90));
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
